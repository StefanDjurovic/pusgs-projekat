using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
	public class Unit
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<User> Members { get; set; } = new List<User>();
	}
}
