namespace API.Controllers.Entities
{
    public class Category
    {
        public long Id { get; set; }
        public required string Title { get; set; }
        public string Color { get; set; }
    }
}