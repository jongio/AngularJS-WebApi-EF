using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AngularJS_WebApi_EF.Models
{
    [Table("Person")]
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? PlaceId { get; set; }
        public virtual Place Place { get; set; }
    }
}