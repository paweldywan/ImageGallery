using ImageGallery.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImageGallery.DAL
{
    public class ImageGalleryContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Image> Images { get; set; }
    }
}
