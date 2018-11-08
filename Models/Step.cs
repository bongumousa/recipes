using System;
using Newtonsoft.Json;

namespace recipes.Models
{
    public class Step
    { 
        [JsonProperty(PropertyName = "step")]
        public string Description { get; set; }
    }
}
