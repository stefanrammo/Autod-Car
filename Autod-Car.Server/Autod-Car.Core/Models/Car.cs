namespace AutodCar.Core.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Engine { get; set; }
        public int Horsepower { get; set; }
        public string BodyType { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
