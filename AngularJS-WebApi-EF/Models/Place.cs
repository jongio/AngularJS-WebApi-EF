using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AngularJS_WebApi_EF.Models
{
    [Table("Place")]
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}