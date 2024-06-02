using AutoMapper;
using ImageGallery.BLL.Interfaces;
using ImageGallery.BLL.Models;
using ImageGallery.DAL;
using ImageGallery.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImageGallery.BLL.Services
{
    public class ImageService(ImageGalleryContext context, IMapper mapper) : IImageService
    {
        private static string GetPath(Image image)
        {
            var currentDirectory = Directory.GetCurrentDirectory();

            return Path.Combine(currentDirectory, "Images", $"{image.Id}{image.Extension}");
        }

        public async Task Add(ImageModel model)
        {
            var entity = mapper.Map<Image>(model);

            context.Add(entity);

            await context.SaveChangesAsync();

            var path = GetPath(entity);

            using var stream = File.OpenWrite(path);

            await model.File.CopyToAsync(stream);
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
