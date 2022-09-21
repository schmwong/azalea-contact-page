import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, ValidationErrors, FormGroupDirective } from "@angular/forms";


@Component({
    selector: "contact-form",
    templateUrl: "./contact-form.component.html"
})
export class ContactFormComponent {
    contactForm: FormGroup;
    msgLength: number;
    

    constructor(public fb: FormBuilder) {
        this.contactForm = this.fb.group({
            firstName: ["".trim(), { validators: this.ValidateName}],
            email: ["".trim(), { validators: this.ValidateEmail}],
            message: ["".trim(), { validators: this.ValidateMessage}]
            },
            { updateOn: "blur"}
        );
        //  
        // this.contactForm.markAsPristine();

        this.msgLength = 0;
    }

    get firstName() { return this.contactForm.controls["firstName"] }
    get email() { return this.contactForm.controls["email"] }
    get message() { return this.contactForm.controls["message"] }


    private ValidateName(control: FormControl): ValidationErrors | null {
        // Includes numbers and non-Latin characters,
        // Returns false if spaces, tabs, or line breaks are found between words
        const nameRegex: RegExp = /^['0-9\p{L}\p{M}]+([^\s\t\n])*['0-9\p{L}\p{M}]*$/ug;
        let name: string = control.value;

        if (!control.pristine) {
            if ( nameRegex.test(name.trim()) == true ) {
                return null;
            } else if ( name.trim().length == 0 ) {
                return { 0: "First Name is required" };
            } else if (nameRegex.test(name.trim()) == false ) {
                return { 0: "Only one name is allowed"};
            }
        }
        return { 0: ""};
        
    }


    private ValidateEmail(control: FormControl): ValidationErrors | null {
        // @ symbol and top level domain mandatory >> example@example.com
        // additional country domain optional >> example@example.com.sg
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let email: string = control.value;

        if (!control.pristine || control.touched) {
            if (emailRegex.test(email.trim()) == true ) {
                return null;
            } else if (control.value == null || email.trim().length == 0) {
                return { 0: "E-mail is required" };
            } else if (emailRegex.test(email.trim()) == false ) {
                return { 0: "Invalid e-mail format"};
            } 
            return null;
        }
        return { 0: ""};
    }


    private ValidateMessage(control: FormControl): ValidationErrors | null {
        let msg: string = control.value;
        const m = document.querySelector("#messagebox");
        console.log(m?.classList.contains("ng-touched"));
        if (!control.pristine || control.touched) { 
            if (msg.trim().length == 0 && (/[\s\t\n]*/m).test(msg)) {
                return {0: "Message cannot be blank"}; 
            }
            else if (msg.trim().length != 0) {
                return null;
            } 
        }
        return { 0: ""};
    }


    public onSubmit(
        formData: FormGroup,
        formDirective: FormGroupDirective
    ): void {
        console.log(this.contactForm.value);
        this.contactForm.reset(); // Reset form data
        formDirective.resetForm(); // Reset the ugly validators
        this.msgLength = 0; // Reset displayed character count
    }


    // target is cast to an HTMLInputElement to allow type-safe access to its value property
    public charCount(event: Event): number { 
        return this.msgLength = (event.target as HTMLInputElement).value.trim().length;
    }

    public makeDirty(event: FormControl): any {
        event.markAsDirty;
        this.ValidateMessage(event);
    }

    public fc(name: any) { return this.contactForm.get(name) as FormControl; }

}