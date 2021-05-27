using System;
using System.Collections.Generic;
using System.Text;

namespace AAYHS.Core.DTOs.Response
{
    public class FilterExhibitorResponseListResponse
    {
        public List<FilterExhibitorResponse> exhibitorResponses { get; set; }
        public int TotalRecords { get; set; }
    }


}
