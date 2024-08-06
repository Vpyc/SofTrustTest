public class ContactEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int DescriptionId { get; set; }
    public DescriptionEntity DescriptionEntity { get; set; }
}

public class DescriptionEntity
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int Topic { get; set; }
    public TopicEntity TopicEntity { get; set; }
}

public class TopicEntity
{
    public int Id { get; set; }
    public string Topic { get; set; }
}