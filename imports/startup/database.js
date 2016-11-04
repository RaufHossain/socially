var bcosc4 = {
      "name" : "BCOSC4",
      "core_courses" : [
         {
            "name" : "COSC1046",
            "credits" : 3,
            "pre" : [],
            "status": "",
            "term":""
         },
         {
            "name" : "COSC1047",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
                "name":"COSC1046"
              }
            ]
         },
	       {
            "name" : "MATH1056",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : []
         },
	       {
            "name" : "MATH1057",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
                "name": "MATH1056"
              }
            ]
         },

         {
            "name" : "COSC2006",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
                "name": "COSC1047"
              },
              {
                "name": "MATH1056"
              }
            ]
         },
         {
            "name" : "COSC2007",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
                "name": "COSC2006"
              }
            ]
         },
	       {
            "name" : "COSC2406",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
                "name": "COSC1047"
              },
              {
                "name": "MATH1056"
              }
            ]
         },
	       {
            "name" : "COSC2307",
            "credits" : 3,
            "status": "",
            "term":"",
            "pre" : [
              {
              "name": "COSC1046"
              }
            ]
         },
         {
             "name" : "COSC3406",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" :[
               {
                 "name": "COSC2006"
               },
               {
                 "name": "COSC2406"
               }
             ]
          },
          {
             "name" : "MATH2056",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "MATH1056"
               }
             ]
          },
          //3rd year
          {
             "name" : "COSC3106",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC2006"
               },
               {
                 "name": "MATH2056"
               }
             ]
          },
          {
             "name" : "COSC3127",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC2006"
               },
               {
                 "name": "COSC2406"
               }
             ]
          },
          {
             "name" : "COSC3407",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC2006"
               },
               {
                 "name": "COSC2406"
               }
             ]
          },
          {
             "name" : "COSC3506",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC2006"
               },
               {
                 "name": "COSC2007"
               },
               {
                 "name": "COSC2406"
               },
               {
                 "name": "COSC2307"
               },
               {
                 "name": "COSC3406"
               }
             ]
          },
          //4th year
          {
             "name" : "COSC4106",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC3106"
               },
               {
                 "name": "COSC2007"
               }
             ]
          },
          {
             "name" : "COSC4436",
             "credits" : 3,
             "status": "",
             "term":"",
             "pre" : [
               {
                 "name": "COSC3406"
               }
             ]
          },
          {
             "name" : "COSC4235",
             "credits" : 6,
             "status": "",
             "term":"",
             "fourth_year_course":[],
             "pre" : []
          },
          {
             "name" : "COSC4086",
             "credits" : 3,
             "status": "",
             "term":"",
             "fourth_year_course":[],
             "pre" : []
          },
          {
             "name" : "COSC4xxx",
             "credits" : 3,
             "status": "",
             "term":"",
             "fourth_year_course":[],
             "pre" : []
          }
      ],
      "humanities": {
        "number_of_credits":0,
        "courses": []
      },
      "social_sciences":{
        "number_of_credits":0,
        "courses": []
      },
      "professional":{
        "number_of_credits":0,
        "courses": []
      },
      "cosc_electives":{
        "number_of_credits":0,
        "courses": []
      },
      "electives" : {
        "number_of_credits":0,
        "courses": []
      }
   }

export {bcosc4};
