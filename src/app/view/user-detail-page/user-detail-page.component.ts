import { Component, OnInit, OnDestroy, EventEmitter, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil, map, distinctUntilChanged } from "rxjs/operators";
import { UserDetailUseCase } from "../../usecase/user-detail.usecase";

@Component({
  templateUrl: "./user-detail-page.component.html",
  styleUrls: ["./user-detail-page.component.css"],
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  user$ = this.userDetailUsecase.user$;

  private onDestroy$ = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private userDetailUsecase: UserDetailUseCase
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        map(params => params["userId"]),
        distinctUntilChanged()
      )
      .subscribe(userId => this.userDetailUsecase.fetchUser(userId));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
