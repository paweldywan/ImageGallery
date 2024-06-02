using ImageGallery.BLL.Interfaces;
using ImageGallery.BLL.Models;
using ImageGallery.DAL;
using ImageGallery.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImageGallery.BLL.Services
{
    public class ImageService(ImageGalleryContext context) : IImageService
    {
        private static string GetPath(Image image)
        {
            var currentDirectory = Directory.GetCurrentDirectory();

            return Path.Combine(currentDirectory, "Images", $"{image.Id}{image.Extension}");
        }

        public async Task Add(FileModel model)
        {
            var file = model.File;

            var fileName = file.FileName;

            var extension = Path.GetExtension(fileName);

            var entity = new Image
            {
                FileName = fileName,
                Extension = extension,
                Title = model.Title,
                Description = model.Description
            };

            context.Add(entity);

            await context.SaveChangesAsync();

            var path = GetPath(entity);

            using var stream = File.OpenWrite(path);

            await file.CopyToAsync(stream);
        }

        public async Task Delete(int id)
        {
            var entity = await context.Images.FindAsync(id);

            if (entity is null)
                return;

            context.Remove(entity);

            await context.SaveChangesAsync();

            var path = GetPath(entity);

            File.Delete(path);
        }

        public Task<List<Image>> Get() => context.Images.ToListAsync();
    }
}
