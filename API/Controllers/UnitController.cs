using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private readonly IUnitRepository repo;
        private readonly IUserRepository userRepo;

        public UnitController(IUnitRepository repo, IUserRepository userRepo)
        {
            this.repo = repo;
            this.userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Unit unit)
        {
            return await this.repo.CreateUnit(unit) ? Ok(unit.Id) : BadRequest();
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var units = await this.repo.GetUnits();
            return Ok(units);
        }


        [HttpGet("{unitId}")]
        public async Task<IActionResult> Get(int unitId)
        {
            var unit = await this.repo.GetUnit(unitId);

            return unit != null ? Ok(unit) : BadRequest();
        }

        [HttpPost("{unitId}-{memberId}")]
        public async Task<IActionResult> AddUnitMember([FromRoute]int unitId, [FromRoute]int memberId) 
        {
            
            var unit = await this.repo.GetUnit(unitId);
            if (unit == null) {
                return BadRequest();
            }

            var member = await this.userRepo.GetUser(memberId);
            if (member == null) {
                return BadRequest();
            }

            bool added = await this.repo.AddUnitMember(unit, member);
            return added ? Ok() : BadRequest();
        }

        [HttpPost("updateUMs/{unitId}")]
        public async Task<IActionResult> UpdateUMs([FromRoute]int unitId, [FromBody]List<int> newUMs)
        {
            return (await this.repo.UpdateUMs(unitId, newUMs)) ? Ok() : BadRequest(); 
        }
        
        [HttpPost("updateUnitName/{unitId}-{name}")]
        public async Task<IActionResult> UpdateUnitName([FromRoute]int unitId, [FromRoute]string name)
        {
            if (name.Length < 3) {
                return BadRequest();
            }

            return (await this.repo.UpdateUnitName(unitId, name)) ? Ok() : BadRequest();
        }

        [HttpDelete("{unitId}")]
        public async Task<IActionResult> DeleteUnit([FromRoute]int unitId) 
        {
            var clearedMembers = await this.repo.UpdateUMs(unitId, new List<int>());
            if (!clearedMembers) {
                return BadRequest();
            }
            
            await this.repo.DeleteUnit(unitId);

            return Ok();
        }
    }
}