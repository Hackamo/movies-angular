export interface PagedResult<T> {
	page: number
	results: T[]
	total_pages: number
	total_results: number
}

export interface MediaItem {
	id: number
	title?: string // Movie
	name?: string // Serie
	poster_path: string | null
	backdrop_path: string | null
	vote_average: number
	overview: string
	release_date?: string
	first_air_date?: string
	genre_ids: number[]
	popularity: number
	vote_count: number
	video?: boolean
	adult?: boolean
	original_language?: string
	original_title?: string
	original_name?: string
	origin_country?: string[]
}

export interface MediaDetails extends MediaItem {
	genres: Genre[]
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string | null
	runtime?: number
	episode_run_time?: number[]
	number_of_episodes?: number
	number_of_seasons?: number
	homepage?: string
	budget?: number
	revenue?: number
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path: string | null
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface VideoResult {
	id: number
	results: Video[]
}

export interface Video {
	iso_639_1: string
	iso_3166_1: string
	name: string
	key: string
	site: string
	size: number
	type: string
	official: boolean
	published_at: string
	id: string
}

export interface CreditsResult {
	id: number
	cast: Cast[]
	crew: Crew[]
}

export interface Cast {
	adult: boolean
	gender: number | null
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
	cast_id?: number
	character?: string
	credit_id: string
	order: number
}

export interface Crew {
	adult: boolean
	gender: number | null
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
	credit_id: string
	department: string
	job: string
}
