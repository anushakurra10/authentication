import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.fragment.subscribe((params: any) => {

      const urlParams = new URLSearchParams(params);
      var id_token: any = urlParams.get('id_token')
      var decoded = jwt_decode(id_token);
      console.log(decoded)
      this.router.navigate(['/dashboard'], { state: { decoded } })

    });

  }

  ngOnInit(): void {

  }
}
