/*==============================================
            ADMIN ENTRY POINT
================================================*/
import { AdminApp } from './adminApp.js';

const app = new AdminApp();
window.adminApp = app;
app.init();
