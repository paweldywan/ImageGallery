using ImageGallery.BLL.Models;
using ImageGallery.DAL.Entities;

namespace ImageGallery.BLL.Interfaces
{
    public interface IImageService
    {
        Task Add(FileModel file);
        Task Delete(int id);
        Task<List<Image>> Get();
    }
}