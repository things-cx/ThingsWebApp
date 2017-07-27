${
    using Typewriter.Extensions.Types;

    Template(Settings settings)
    {
      settings.OutputExtension = ".d.ts";
    }

    string ValidatorsMap(Property property)
    {
        string validators = ", [";

        if (property.Attributes.Any(x => x.Name.Equals("Required")))
        {
            validators += "Validators.required,";
        }
        if (property.Attributes.Any(x => x.Name.Equals("Display")))
        {
            validators += "Validators.display,";
        }

        validators += "]],";

        return validators;

        //Validators.required,
        //Validators.minLength(3),
        //Validators.maxLength(20),
        //Validators.pattern('^\w+$')
    }
}$Classes(Things.Api.ViewModels.User.LoginUserViewModel##)[export namespace $Namespace {  
    export class $Name $BaseClass[extends $Name] { 
    
        getForm() {
            return this.formBuilder.group({
                $Properties[
                    $name: [''$ValidatorsMap ]
                ]
            });
        }
    }
}]