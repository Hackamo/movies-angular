import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { MediaItem } from '../services/tmdb.models'

@Component({
	selector: 'app-media-card',
	templateUrl: './media-card.component.html',
	styleUrls: ['./media-card.component.scss'],
	standalone: true,
	imports: [CommonModule, MatCardModule, RouterModule, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaCardComponent {
	mediaInfos = input.required<MediaItem>()

	routerType = computed(() => {
		return this.mediaInfos().title ? 'movie' : 'serie'
	})

	isPhonePortrait = computed(() => false)

	getNoteColor() {
		const vote = this.mediaInfos().vote_average
		if (vote > 7) {
			return {
				background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
				color: 'white',
			}
		}
		if (vote > 5) {
			return {
				background: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
				color: 'white',
			}
		}
		if (vote > 0) {
			return {
				background: 'linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)',
				color: 'white',
			}
		}
		return {
			background: 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
			color: 'white',
		}
	}
}
