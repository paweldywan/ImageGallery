using Microsoft.EntityFrameworkCore;

namespace ImageGallery.DAL
{
    public class ImageGallerySeeder(ImageGalleryContext imageGalleryContext)
    {
        public async Task Migrate()
        {
            var canMigrate = (await imageGalleryContext.Database.GetPendingMigrationsAsync()).Any();

            if (canMigrate)
                await imageGalleryContext.Database.MigrateAsync();
        }
    }
}
