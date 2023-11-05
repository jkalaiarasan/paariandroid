<template>
    <ion-content id="pdfContent">
      <ion-list>
        <ion-item class="total-amount">
          மொத்த சேமிப்பு தொகை: ₹{{ totalAmount }}
        </ion-item>
        <ion-item v-for="transaction in transactions" :key="transaction.id">
            <div style="width: 100%;">
                <ion-label class="transaction-label">
                    <div @click="toggleAccordion(transaction)" class="accordion-header">
                    {{ transaction.Name }} &nbsp;&nbsp;&nbsp;&nbsp; ₹{{ transaction.Amount__c }}
                    <ion-icon :icon="transaction.isOpen ? 'chevron-down' : 'chevron-forward'"></ion-icon>
                    </div>
                </ion-label>
                <ion-list style="width: 100%;" v-if="transaction.isOpen" class="transaction-details">
                    <ion-item style="width: 100%;" class="item">
                        <div style="width: 90%;" class="transaction-info">
                        Type: {{ transaction.Type__c }} <br />
                        மாதம்: {{ transaction.Month__c }} <br />
                        தேதி: {{ transaction.Date__c }} <br />
                        குறிப்பு: {{ transaction.Description__c }} <br />
                        </div>
                        <div class="download-button">
                        <ion-button @click="downloadTransaction(transaction)">
                            <i class="bi bi-download"></i>
                        </ion-button>
                        </div>
                    </ion-item>
                </ion-list>
                <div class="line-bar">
                </div>
            </div>
        </ion-item>
      </ion-list>
    </ion-content>
    <div v-if="showSpinner" class="spinner-container">
        <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import { serverUrl } from '@/config.js';
    import { toastController } from '@ionic/vue';
    import html2pdf from 'html2pdf.js';
    import VueHtml2pdf from 'vue-html2pdf';
    import { IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton, IonSpinner } from '@ionic/vue';
    export default {
    components: {
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonButton,
        IonSpinner,
    },
    mounted(){
        this.getTransactions();
    },
    data() {
      return {
        showSpinner: false,
        totalAmount: 0,
        transactions: [],
      };
    },
    methods: {
      toggleAccordion(transaction) {
    //     this.transactions.forEach((t) => {
    //     if (t.id !== transaction.id) {
    //       t.isOpen = false;
    //     }
    //   });
        transaction.isOpen = !transaction.isOpen;
      },
      async downloadTransaction(transaction) {
        const options = {
            margin: 10,
            filename: 'your-pdf-filename.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Replace this with the actual HTML content you want to convert to PDF
        const content = `<div>Simple PDF Content</div>`;

        // Make sure the content is correctly selected and available in the DOM

        html2pdf()
            .from(content)
            .set(options)
            .outputPdf()
            .then((pdf) => {
                const blob = new Blob([pdf], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url);
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
      },
      async displayToast(message, color) {
        const toast = await toastController.create({
            message: message,
            duration: 2000,
            position: 'top',
            color: color,
        });
        await toast.present();
    },
      async getTransactions(){
        this.showSpinner = true;
        const url = serverUrl + '/getTransaction';
        const data = {
            token: await this.$storage.get('GROUP'),
        };
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response?.data?.data?.length > 0){
                this.transactions = response?.data?.data;
                this.totalAmount = this.transactions[0].Group_Account__r.Total_Amount__c;
            }
            this.showSpinner = false;
        } catch (error) {
            this.showSpinner = false;
            this.displayToast('Error', 'danger');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  
  .transaction-label .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Center vertically within the accordion header */
    cursor: pointer; /* Add cursor pointer for clickability */
    padding: 10px; /* Add padding to the accordion header */
  }
  
  .item{
    margin-bottom: 10px;
  }
  .transaction-details {
    padding: 10px; /* Add padding to the transaction details */
  }

  .download-button {
    text-align: right;
   }

   .line-bar {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background-color: #007bff;
    }
  </style>
  