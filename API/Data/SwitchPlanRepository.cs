using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SafetyDocumentRepository : ISafetyDocumentRepository
    {
        private readonly DataContext context;

        public SafetyDocumentRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<int> CreateSafetyDocument(SafetyDocument safetyDocument)
        {
            if (safetyDocument != null)
            {
                this.context.SafetyDocuments.Add(safetyDocument);
                await this.context.SaveChangesAsync();
                return safetyDocument.Id;
            }
            return -1;
        }

        public async Task<bool> CreateSafetyDocumentInstruction(SwitchingInstruction instructions, int switchingPlanId)
        {
            SwitchingInstruction instruction = new SwitchingInstruction();

            instruction.SwitchingPlanId = switchingPlanId;
            instruction.isExecuted = instructions.isExecuted;
            instruction.Message = instructions.Message;
            this.context.SwitchingInstructions.Add(instruction);

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteDocument(int id)
        {
            var document = this.context.SafetyDocuments.Where(x => x.Id.Equals(id)).FirstOrDefault();
            if (document != null)
            {
                this.context.SafetyDocuments.Remove(document);
            }
            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<SafetyDocument>> GetSafetyDocumentPlans(PaginationParameters paginationParameters, string type, string status)
        {
            List<SafetyDocument> documents = await this.context.SafetyDocuments.ToListAsync();

            if (!string.IsNullOrEmpty(type) && type != "undefined")
                documents = documents.Where(d => d.Type.Equals(type == "Planned" ? WorkType.Planned : WorkType.NotPlanned)).ToList();

            if (!string.IsNullOrEmpty(status) && status != "undefined")
                documents = documents.Where(d => d.Status.Equals(status == "Draft" ? StatusType.Draft : StatusType.Submited)).ToList();

            return documents.OrderBy(x => x.Id).Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).ToList();
        }
    }
}