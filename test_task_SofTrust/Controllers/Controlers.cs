using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace test_task_SofTrust;

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