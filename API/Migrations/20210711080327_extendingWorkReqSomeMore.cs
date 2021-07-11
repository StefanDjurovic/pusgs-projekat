using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class extendingWorkReqSomeMore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "WorkRequests",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "WorkRequests");
        }
    }
}
