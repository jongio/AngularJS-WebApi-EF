using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AngularJS_WebApi_EF.Models;

namespace AngularJS_WebApi_EF.Controllers
{
    public class PlaceController : ApiController
    {
        private PersonContext db = new PersonContext();

        // GET api/Place
        public IEnumerable<Place> GetPlaces()
        {
            return db.Places.AsEnumerable();
        }

        // GET api/Place/5
        public Place GetPlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return place;
        }

        // PUT api/Place/5
        public HttpResponseMessage PutPlace(int id, Place place)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != place.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(place).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Place
        public HttpResponseMessage PostPlace(Place place)
        {
            if (ModelState.IsValid)
            {
                db.Places.Add(place);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, place);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = place.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Place/5
        public HttpResponseMessage DeletePlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Places.Remove(place);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, place);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}