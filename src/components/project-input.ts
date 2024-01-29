import { Component } from "./base-component";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project";
import { autobind } from "../decorators/autobind";
import { Validatable, validate } from "../util/validation";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        super("project-input", "app", "afterbegin", "user-input");
        this.titleInputEl = document.getElementById(
            "title"
        ) as HTMLInputElement;
        this.descriptionInputEl = document.getElementById(
            "description"
        ) as HTMLInputElement;
        this.peopleInputEl = document.getElementById(
            "people"
        ) as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener("submit", this.handleSubmit);
    }
    renderContent() {}
    @autobind
    private handleSubmit(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            const project = new Project(
                Math.random().toString(),
                title,
                description,
                people,
                ProjectStatus.Active
            );
            projectState.addProject(project);
            this.clearInputs();
        }
    }
    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = +this.peopleInputEl.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true,
        };
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: people,
            required: true,
            min: 1,
            max: 20,
        };
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert("Invalid input, please try again!");
            return;
        }
        return [title, description, people];
    }
    private clearInputs() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
}
