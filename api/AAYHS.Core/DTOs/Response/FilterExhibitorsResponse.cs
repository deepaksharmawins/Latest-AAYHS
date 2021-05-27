using System;
using System.Collections.Generic;
using System.Text;

namespace AAYHS.Core.DTOs.Response
{
    public class FilterExhibitorsResponse
    {
        public int ExhibitorId { get; set; }
        public int GroupId { get; set; }
        public int AddressId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? BackNumber { get; set; }
        public int? BirthYear { get; set; }
        public bool IsNSBAMember { get; set; }
        public bool IsDoctorNote { get; set; }
        public int QTYProgram { get; set; }
        public string PrimaryEmail { get; set; }
        public string SecondaryEmail { get; set; }
        public string Phone { get; set; }
        public string ZipCode { get; set; }
        public int CityId { get; set; }
        public int? StateId { get; set; }
        public string GroupName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public List<ExhibitorStallAssignmentResponse> exhibitorStallAssignmentResponses { get; set; }

    }

   
}
