using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace test_task_SofTrust
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly DBContext _context;
    
        public TopicsController(DBContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopicEntity>>> GetTopics()
        {
            return await _context.Topics.ToListAsync();
        }
    }
    
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly DBContext _context;

        public ContactsController(DBContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<ContactEntity>> PostContact([FromBody] ContactDto contactDto)
        {
            if ( string.IsNullOrEmpty(contactDto.Name) || string.IsNullOrEmpty(contactDto.Email) || string.IsNullOrEmpty(contactDto.Phone) || string.IsNullOrEmpty(contactDto.Description) || contactDto.TopicId <= 0)
            {
                return BadRequest("Не валидные данные.");
            }
            
            var existingContact = await _context.Contacts
                .FirstOrDefaultAsync(c => c.Email == contactDto.Email && c.Phone == contactDto.Phone);

            if (existingContact != null)
            {
                var retDescription = await _context.Descriptions
                    .Where(d => d.Id == existingContact.DescriptionId)
                    .Select(d => new
                    {
                        d.Description,
                        d.Topic
                    })
                    .FirstOrDefaultAsync();

                var topic = await _context.Topics
                    .Where(t => t.Id == retDescription.Topic)
                    .Select(t => t.Topic)
                    .FirstOrDefaultAsync();

                return Ok(new ContactDto
                {
                    Id = existingContact.Id,
                    Name = existingContact.Name,
                    Email = existingContact.Email,
                    Phone = existingContact.Phone,
                    Description = retDescription.Description,
                    Topic = topic
                });
            }
            
            var description = new DescriptionEntity
            {
                Description = contactDto.Description,
                Topic = contactDto.TopicId 
            };
    
            _context.Descriptions.Add(description);
            await _context.SaveChangesAsync();
            
            var contact = new ContactEntity
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Phone = contactDto.Phone,
                DescriptionId = description.Id 
            };
    
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
    
            return CreatedAtAction(nameof(PostContact), new ContactDto
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email,
                Phone = contact.Phone,
                Description = description.Description,
                TopicId = description.Topic
            });
        }
    }

        
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public int TopicId { get; set; }
        
        public string Topic { get; set; }
    }
}