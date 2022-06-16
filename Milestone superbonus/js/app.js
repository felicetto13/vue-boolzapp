const contatti = [
    {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Hai portato a spasso il cane?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Ricordati di stendere i panni",
                status: "sent",
            },
            {
                date: "10/01/2020 16:15:22",
                message: "Tutto fatto!",
                status: "received",
            },
        ],
    },
    {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
            {
                date: "20/03/2020 16:30:00",
                message: "Ciao come stai?",
                status: "sent",
            },
            {
                date: "20/03/2020 16:30:55",
                message: "Bene grazie! Stasera ci vediamo?",
                status: "received",
            },
            {
                date: "20/03/2020 16:35:00",
                message: "Mi piacerebbe ma devo andare a fare la spesa.",
                status: "sent",
            },
        ],
    },
    {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
            {
                date: "28/03/2020 10:10:40",
                message: "La Marianna va in campagna",
                status: "received",
            },
            {
                date: "28/03/2020 10:20:10",
                message: "Sicuro di non aver sbagliato chat?",
                status: "sent",
            },
            {
                date: "28/03/2020 16:15:22",
                message: "Ah scusa!",
                status: "received",
            },
        ],
    },
    {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Lo sai che ha aperto una nuova pizzeria?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Si, ma preferirei andare al cinema",
                status: "received",
            },
        ],
    },
    {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ricordati di chiamare la nonna",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Va bene, stasera la sento",
                status: "received",
            },
        ],
    },
    {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao Claudia, hai novità?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Non ancora",
                status: "received",
            },
            {
                date: "10/01/2020 15:51:00",
                message: "Nessuna nuova, buona nuova",
                status: "sent",
            },
        ],
    },
    {
        name: "Federico",
        avatar: "_7",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Fai gli auguri a Martina che è il suo compleanno!",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Grazie per avermelo ricordato, le scrivo subito!",
                status: "received",
            },
        ],
    },
    {
        name: "Davide",
        avatar: "_8",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao, andiamo a mangiare la pizza stasera?",
                status: "received",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
                status: "sent",
            },
            {
                date: "10/01/2020 15:51:00",
                message: "OK!!",
                status: "received",
            },
        ],
    },
];


new Vue(
    {
        el: "#app",
        data:
        {
            users: contatti,
            indice: null,
            currentUser: contatti[0],
            newMessage: "",
            userReserching: "",
            filterUser: contatti,
            searched: false,
            showM: false,
            pendingUser: "",
            stateUser: "ultimo accesso alle " + contatti[0].messages[contatti[0].messages.length-1].date.substr(contatti[0].messages[contatti[0].messages.length-1].date.length-8,5) ,
            setAutomaticAnswere: ["Posso venire con te?","Dove andrai in vacanza?","Si, certamente farai parte del gruppo!","Quando arriverà il giorno giusto, diventerò un Web Developer!","Mangiamo a casa. Sto facendo una pizza"]

        },
        methods:
        {
            currUser(user) {
                this.currentUser = user
                this.setState();
            },
            sendMessage() {
                this.currentUser.messages.push(
                    {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        message: this.newMessage.trim(),
                        status: "sent",
                    }
                )
                this.stateUser = "sta scrivendo..."
                this.pendingUser = this.currentUser;
                setTimeout(this.automaticAnswere, 1000)
                this.newMessage = "";
                
            },
            automaticAnswere() {
                this.pendingUser.messages.push(
                    {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        message: this.setAutomaticAnswere[Math.floor(Math.random() * this.setAutomaticAnswere.length)],
                        status: "received",
                    })
                    this.changeStateUser();
            },
            filteredUser() {
                if (this.userReserching != "") {
                    this.filterUser = this.users.filter((element, i) => {
                        return element.name.toLowerCase().includes(this.userReserching.toLowerCase());
                    })
                } else {
                    this.filterUser = this.users
                }
                if (this.filteredUser.length === 0) {
                    this.searched = true;
                }
            },
            showMenu(index) {
                if (!this.showM) {
                    this.indice = index;
                    this.showM = true
                } else if (this.showM) {
                    this.indice = null;
                    this.showM = false
                }

            },
            deleteMessage(index) {
                this.currentUser.messages.splice(index, 1);
                this.indice = null;
                this.showM = false
            },
            changeStateUser(){
                this.stateUser= "Online"
                setTimeout( this.setState, 3000)
            },
            setState(){
                const num =this.currentUser.messages[this.currentUser.messages.length-1].date.substr(this.currentUser.messages[this.currentUser.messages.length-1].date.length-8,5)
                this.stateUser = "ultimo accesso alle " + num
            }
            
            

        },
    }
)

Array.length
