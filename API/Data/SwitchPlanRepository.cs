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
                var document = this.context.SafetyDocuments.Where(x => x.Id.Equals(safetyDocument.Id)).FirstOrDefault();
                if (document != null)
                {
                    document.Type = safetyDocument.Type;
                    document.Status = safetyDocument.Status;
                    document.FieldCrew = safetyDocument.FieldCrew;
                    document.SwitchingPlan = safetyDocument.SwitchingPlan;
                    document.Details = safetyDocument.Details;
                    document.Notes = safetyDocument.Notes;
                    document.Telephone = safetyDocument.Telephone;
                }
                else
                {
                    this.context.SafetyDocuments.Add(safetyDocument);

                }
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

                var multimediaAttachments = this.context.MultimediaAttachments.Where(x => x.SwitchPlanId.Equals(id)).ToList();
                var instructions = this.context.SwitchingInstructions.Where(x => x.SwitchingPlanId.Equals(id)).ToList();

                foreach (var x in multimediaAttachments)
                    this.context.MultimediaAttachments.Remove(x);

                foreach (var x in instructions)
                    this.context.SwitchingInstructions.Remove(x);
            }
            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteInstructions(int id)
        {
            var instructions = await this.context.SwitchingInstructions.Where(x => x.SwitchingPlanId.Equals(id)).ToListAsync();

            foreach (var x in instructions)
                this.context.SwitchingInstructions.Remove(x);

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<SwitchingInstruction>> GetAllInstructions(int id)
        {
            return await this.context.SwitchingInstructions.Where(x => x.SwitchingPlanId.Equals(id)).ToListAsync();
        }

        public async Task<SafetyDocument> GetDocument(int id)
        {
            var document = this.context.SafetyDocuments.FirstOrDefault(x => x.Id.Equals(id));
            return document;
        }

        public async Task<IEnumerable<SafetyDocument>> GetSafetyDocumentPlans(SortingParam consumerSorting, PaginationParameters paginationParameters, string type, string status)
        {
            List<SafetyDocument> documents = await this.context.SafetyDocuments.ToListAsync();

            if (!string.IsNullOrEmpty(type) && type != "undefined")
                documents = documents.Where(d => d.Type.Equals(type == "Planned" ? WorkType.Planned : WorkType.NotPlanned)).ToList();

            if (!string.IsNullOrEmpty(status) && status != "undefined")
                documents = documents.Where(d => d.Status.Equals(status == "Draft" ? StatusType.Draft : StatusType.Submited)).ToList();

            if (!string.IsNullOrWhiteSpace(consumerSorting.SortBy))
            {
                if (consumerSorting.SortDirection == "ascending")
                {
                    switch (consumerSorting.SortBy)
                    {
                        case "Id":
                            documents = documents.OrderBy(x => x.Id).ToList();
                            break;
                        case "FieldCrew":
                            documents = documents.OrderBy(x => x.FieldCrew).ToList();
                            break;
                        case "SwitchingPlan":
                            documents = documents.OrderBy(x => x.SwitchingPlan).ToList();
                            break;
                        case "CreatedDateTime":
                            documents = documents.OrderBy(x => x.CreatedDateTime).ToList();
                            break;
                        case "Telephone":
                            documents = documents.OrderBy(x => x.Telephone).ToList();
                            break;
                    }
                }
                else
                {
                    switch (consumerSorting.SortBy)
                    {
                        case "Id":
                            documents = documents.OrderByDescending(x => x.Id).ToList();
                            break;
                        case "FieldCrew":
                            documents = documents.OrderByDescending(x => x.FieldCrew).ToList();
                            break;
                        case "SwitchingPlan":
                            documents = documents.OrderByDescending(x => x.SwitchingPlan).ToList();
                            break;
                        case "CreatedDateTime":
                            documents = documents.OrderByDescending(x => x.CreatedDateTime).ToList();
                            break;
                        case "Telephone":
                            documents = documents.OrderByDescending(x => x.Telephone).ToList();
                            break;
                    }
                }
            }
            return documents.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).ToList();
        }
    }
}