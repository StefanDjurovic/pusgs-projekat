using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class DeviceTableFieldUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Devices",
                newName: "StreetName");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StreetNumber",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "StreetNumber",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "StreetName",
                table: "Devices",
                newName: "Location");
        }
    }
}
