namespace ImageGallery.DAL.Entities
{
    public class Image
    {
        public int Id { get; set; }

        public required string FileName { get; set; }

        public required string Extension { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string Url => $"/Images/{Id}{Extension}";
    }
}
