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
    
            // Сначала создаем запись в таблице Descriptions
            var description = new DescriptionEntity
            {
                Description = contactDto.Description,
                Topic = contactDto.TopicId // Устанавливаем FK для Topic
            };
    
            _context.Descriptions.Add(description);
            await _context.SaveChangesAsync(); // Сохраняем изменения, чтобы получить ID
    
            // Теперь создаем запись в таблице Contacts
            var contact = new ContactEntity
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Phone = contactDto.Phone,
                DescriptionId = description.Id // Устанавливаем FK для Description
            };
    
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
    
            return CreatedAtAction(nameof(PostContact), new { id = contact.Id }, contact);
        }
    }

        
    public class ContactDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public int TopicId { get; set; }
    }
}


    

