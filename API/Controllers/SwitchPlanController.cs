using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyDocumentsController : ControllerBase
    {
        private readonly ISafetyDocumentRepository repo;
        public SafetyDocumentsController(ISafetyDocumentRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("create")]
        public async Task<int> CreateSwitchPlan(SafetyDocument switchingPlan)
        {
            return await this.repo.CreateSafetyDocument(switchingPlan);
        }

        [HttpPost("instructions/{switchingPlanId}")]
        public async Task<bool> CreateInstructions(SwitchingInstruction instruction, int switchingPlanId)
        {
            return await this.repo.CreateSafetyDocumentInstruction(instruction, switchingPlanId);
        }

        [HttpGet("get-plans/{type}/{status}")]
        public async Task<IEnumerable<SafetyDocument>> GetAllSwitchPlans([FromQuery] PaginationParameters paginationParameters, string type, string status)
        {
            return await this.repo.GetSafetyDocumentPlans(paginationParameters, type, status);
        }

        [HttpGet("document-count/{type}/{status}")]
        public async Task<int> GetAllSwitchPlansCount([FromQuery] PaginationParameters paginationParameters, string type, string status)
        {
            IEnumerable<SafetyDocument> allDocuments = await this.repo.GetSafetyDocumentPlans(paginationParameters, type, status);
            return allDocuments.Count();
        }

        [HttpPost("delete/{documentId}")]
        public async Task<bool> GetAllSwitchPlansCount(int documentId)
        {
            return await this.repo.DeleteDocument(documentId);
        }
    }
}