using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularJS_WebApi_EF.Models
{
    public class Place
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}