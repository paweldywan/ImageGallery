using ImageGallery.BLL;
using ImageGallery.BLL.Interfaces;
using ImageGallery.BLL.Services;
using ImageGallery.DAL;
using Microsoft.Extensions.FileProviders;

namespace ImageGallery.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var services = builder.Services;

            var configuration = builder.Configuration;

            var environment = builder.Environment;

            services.AddControllers();

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

            services.AddAutoMapper(typeof(ImageGalleryMappingProfile).Assembly);

            services.AddScoped<ImageGallerySeeder>();

            services.AddScoped<IImageService, ImageService>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddSqlServer<ImageGalleryContext>(connectionString, o => o.MigrationsAssembly("ImageGallery.DAL"));

            var app = builder.Build();

            var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();

            using var scope = scopeFactory.CreateScope();

            var seeder = scope.ServiceProvider.GetRequiredService<ImageGallerySeeder>();

            seeder.Migrate().Wait();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            var currentDirectory = Directory.GetCurrentDirectory();

            var imagesDirectory = Path.Combine(currentDirectory, "Images");

            if (!Directory.Exists(imagesDirectory))
                Directory.CreateDirectory(imagesDirectory);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(imagesDirectory),
                RequestPath = "/Images"
            });

            if (environment.IsDevelopment())
            {
                app.UseSwagger();

                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
