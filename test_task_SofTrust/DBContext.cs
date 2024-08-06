using Microsoft.EntityFrameworkCore;

namespace test_task_SofTrust;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions<DBContext>
        options): base(options) {}
    
    public DbSet<ContactEntity> Contacts { get; set; }
    public DbSet<DescriptionEntity> Descriptions { get; set; }
    public DbSet<TopicEntity> Topics { get; set; }
}