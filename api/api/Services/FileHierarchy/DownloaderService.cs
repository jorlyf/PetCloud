using api.Entities.FileHierarchyNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchy
{
	public class DownloaderService
	{
		private readonly UnitOfWork _UoW;
		public DownloaderService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task<string> GetPhysicalFilePath(Guid userId, Guid fileId)
		{
			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			if (file == null) throw new ApiException(ApiExceptionCode.FileNotFound);
			if (file.UserId != userId) throw new ApiException(ApiExceptionCode.AccessDenied);

			return $"{AppDirectories.CloudData}\\{file.Path}";
		}
		public async Task<MemoryStream> GetFolderStreamToDownload(Guid userId, Guid folderId)
		{
			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }
			if (folder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			MemoryStream stream = new MemoryStream();
			using ZipArchive archive = await PackFolderArchieveAsync(stream, folder);
			return stream;
		}

		private class FolderStruct
		{
			public Folder Model;
			public List<FolderStruct> SubFolders;
			public List<File> Files;
		}

		private async Task<FolderStruct> GetRecursivelyFolderContent(Folder folder, FolderStruct? root = null)
		{
			root ??= new FolderStruct();
			root.Model = folder;

			List<Folder> subFolders = await _UoW.FolderRepository
				.GetByParentId(folder.Id)
				.AsNoTracking()
				.ToListAsync();

			List<File> files = await _UoW.FileRepository
				.GetByFolderId(folder.Id)
				.AsNoTracking()
				.ToListAsync();

			root.Files = new List<File>(files);
			root.SubFolders = new List<FolderStruct>();

			for (int i = 0; i < subFolders.Count; i++)
			{
				Folder subFolder = subFolders[i];
				FolderStruct folderStruct = new FolderStruct();
				root.SubFolders.Add(folderStruct);
				await GetRecursivelyFolderContent(subFolder, folderStruct);
			}

			return root;
		}
		private async Task<ZipArchive> PackFolderArchieveAsync(MemoryStream stream, Folder folder)
		{
			ZipArchive archive = new ZipArchive(stream, ZipArchiveMode.Create, true);

			FolderStruct folderStruct = await GetRecursivelyFolderContent(folder);

			await PackRecursivelyFolderArchieveAsync(archive, folderStruct);

			return archive;
		}
		private async Task PackRecursivelyFolderArchieveAsync(ZipArchive archive, FolderStruct folderStruct, string fullPath = "")
		{
			await PackFilesToZipAsync(archive, folderStruct.Files, fullPath);

			foreach (FolderStruct subFolderStruct in folderStruct.SubFolders)
			{
				ZipArchiveEntry subFolderEntry = archive.CreateEntry(fullPath + subFolderStruct.Model.Name + "/"); // create an empty folder
				await PackRecursivelyFolderArchieveAsync(archive, subFolderStruct, subFolderEntry.FullName);
			}
		}
		private async Task PackFilesToZipAsync(ZipArchive archive, List<File> files, string fullPath = "")
		{
			foreach (File file in files)
			{
				string filePath = $"{AppDirectories.CloudData}\\{file.Path}";
				if (!System.IO.File.Exists(filePath)) continue;

				ZipArchiveEntry fileEntry = archive.CreateEntry(fullPath + file.Name);

				using FileStream fileStream = new FileStream(filePath, FileMode.Open);
				using Stream entryStream = fileEntry.Open();
				await fileStream.CopyToAsync(entryStream);
			}
		}
	}
}
