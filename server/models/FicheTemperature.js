const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var infirmiereSchema = new mongoose.Schema({
    sexe:{
        type:String
    },
    poids:{
        type: Number
    },
    chambre:{
        type: String
    },
    traitement:[
        {
            labbel:{
                type: String
            },
            j1matin:{
                type: Boolean
            },
            j1midi:{
                type: Boolean
            },
            j1soir:{
                type: Boolean
            },
            j2matin:{
                type: Boolean
            },
            j2midi:{
                type: Boolean
            },
            j2soir:{
                type: Boolean
            },
            j3matin:{
                type: Boolean
            },
            j3midi:{
                type: Boolean
            },
            j3soir:{
                type: Boolean
            },
            j4matin:{
                type: Boolean
            },
            j4midi:{
                type: Boolean
            },
            j4soir:{
                type: Boolean
            },
            j5matin:{
                type: Boolean
            },
            j5midi:{
                type: Boolean
            },
            j5soir:{
                type: Boolean
            },
            j6matin:{
                type: Boolean
            },
            j6midi:{
                type: Boolean
            },
            j6soir:{
                type: Boolean
            },
            
            
        }
    ],

    t42:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t41:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t40:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t39:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t38:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t37:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t36:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    t35:{
        j1 :{
            type: Boolean,
        },
        j2 :{
            type: Boolean,
        },
        j3 :{
            type: Boolean,
        },
        j4 :{
            type: Boolean,
        },
        j5 :{
            type: Boolean,
        },
        j6 :{
            type: Boolean,
        },
    },
    examensComplementaires:[
        {
            type: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('ficheTemperature', infirmiereSchema)