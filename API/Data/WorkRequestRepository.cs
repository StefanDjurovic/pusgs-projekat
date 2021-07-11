using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class WorkRequestRepository : IWorkRequestRepository
    {
        private readonly DataContext context;
        public WorkRequestRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task AddChange(int workRequestId, int changedBy, string content)
        {
            var wr = await this.GetRequest(workRequestId);
            if (wr == null)
            {
                return;
            }

            var changeEvent = new ChangeEvent()
            {
                Content = content,
                ChangedBy = changedBy,
                ChangedAt = System.DateTime.Now
            };

            wr.History.Add(changeEvent);

            await this.context.SaveChangesAsync();
        }

        public async Task<bool> CreateRequest(WorkRequest workRequest)
        {
            await this.context.WorkRequests.AddAsync(workRequest);

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int workRequestId)
        {
            var workRequest = await this.GetRequest(workRequestId);
            if (workRequest == null)
            {
                return false;
            }

            this.context.WorkRequests.Remove(workRequest);
            return (await this.context.SaveChangesAsync()) > 0;
        }

        public async Task<WorkRequest> GetRequest(int requestId)
        {
            return await this.context.WorkRequests.Include(wr => wr.History).Include(wr => wr.Attachments).FirstOrDefaultAsync(wr => wr.Id == requestId);
        }

        public async Task<IEnumerable<WorkRequest>> GetRequests(int userId, PaginationParameters param)
        {
            return await this.context.WorkRequests.Where(x => x.Id.Equals(userId)).OrderBy(x => x.Id).Skip((param.PageNumber - 1) * param.PageSize).Take(param.PageSize).ToListAsync();
        }

        public async Task<IEnumerable<WorkRequest>> GetRequests()
        {
            return await this.context.WorkRequests.ToListAsync();
        }

        public IEnumerable<WorkRequest> GetRequests(int page, int numberOfResults)
        {
            if (page != 1 || numberOfResults != 10) {
                throw new System.Exception("yup");
            }
            var allWorkRequests = this.context.WorkRequests.ToList();
            var first = (page - 1) * numberOfResults;
            var last = first + numberOfResults;
            if (last > allWorkRequests.Count - 1) {
                last = allWorkRequests.Count - 1;
            }

            List<WorkRequest> result = new List<WorkRequest>();

            for (int i = 0; i < allWorkRequests.Count; i++)
            {
                if (i >= first && i <= last) {
                    result.Add(allWorkRequests[i]);
                }                
            }

            return result;
        }

        public async Task<bool> UpdateRequest(WorkRequest workRequest)
        {
            var wr = await this.GetRequest(workRequest.Id);
            if (wr == null) 
            {
                return false;
            }

            wr.StartDate = workRequest.StartDate;
            wr.EndDate = workRequest.EndDate;
            wr.PhoneNumber = workRequest.PhoneNumber;
            wr.Purpose = workRequest.Purpose;
            wr.WorkType = workRequest.WorkType;
            wr.AdditionalNotes = workRequest.AdditionalNotes;
            wr.Address = workRequest.Address;
            wr.IsEmergency = workRequest.IsEmergency;
            wr.Company = workRequest.Company;

            return (await this.context.SaveChangesAsync()) > 0;
        }
    }
}