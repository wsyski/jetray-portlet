import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {StaffListComponent} from "./staff/components/staff-list.component";

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found.component';
import {AlwaysDenyGuard} from './always-deny.guard';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: TaskListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'staff', component: StaffListComponent},
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    declarations: [
        AppComponent,
        TaskComponent,
        TaskListComponent,
        AboutComponent,
        StaffListComponent,
        NotFoundComponent
    ],
    providers: [
        AlwaysDenyGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
