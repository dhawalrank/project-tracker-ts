import { Project, ProjectStatus } from "../models/project";
import { State } from "./base-state";

// Project state management
class ProjectState extends State<Project> {
	private static instance: ProjectState;
	private static key: string = "PROJECT";
	private constructor() {
		super(ProjectState.key);
	}
	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}
	addProject(project: Project) {
		this.state[ProjectState.key].push(project);
		this.updateListeners();
	}
	moveProject(id: string, newStatus: ProjectStatus) {
		const project = this.state[ProjectState.key].find(
			(prj) => prj.id === id
		);
		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}
	private updateListeners() {
		for (const listenerFn of this.listeners) {
			listenerFn(this.state[ProjectState.key]);
		}
	}
}

export const projectState = ProjectState.getInstance();
