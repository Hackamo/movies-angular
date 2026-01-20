import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss'],
	standalone: true,
	imports: [CommonModule],
})
export class PersonComponent implements OnInit {
	personId: string | null = null

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.personId = this.route.snapshot.paramMap.get('id')
	}
}
