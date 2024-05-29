
using ImageGallery.DAL;

namespace ImageGallery.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<ImageGallerySeeder>();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddSqlServer<ImageGalleryContext>(connectionString, o => o.MigrationsAssembly("ImageGallery.DAL"));

            var app = builder.Build();

            var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();

            using var scope = scopeFactory.CreateScope();

            var seeder = scope.ServiceProvider.GetRequiredService<ImageGallerySeeder>();

            seeder.Migrate().Wait();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
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
