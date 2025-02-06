namespace API.Controllers.Entities
{
    public class Meal
    {
        public long Id { get; set; }
        public string CategoryIds { get; set; }
        public required string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Ingredients { get; set; }
        public string Steps { get; set; }
        public int Duration { get; set; }
        public string Complexity { get; set; }
        public string Affordability { get; set; }
        public bool IsGlutenFree { get; set; }
        public bool IsVegan { get; set; }
        public bool IsVegetarian { get; set; }
        public bool IsLactoseFree { get; set; }




    }
    public class AddMeal
    {
        public long Id { get; set; }
        public List<long> CategoryIds { get; set; } = new List<long>();
        public required string Title { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Ingredients { get; set; } = new List<string>();
        public List<string> Steps { get; set; } = new List<string>();
        public int Duration { get; set; }
        public string Complexity { get; set; }
        public string Affordability { get; set; }
        public bool IsGlutenFree { get; set; }
        public bool IsVegan { get; set; }
        public bool IsVegetarian { get; set; }
        public bool IsLactoseFree { get; set; }
    }

}
