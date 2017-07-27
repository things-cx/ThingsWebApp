${
    using Typewriter.Extensions.Types;
    using System.Text.RegularExpressions;

    Template(Settings settings)
    {
      settings.OutputExtension = ".ts";
    }

    string TypeMap(Property property)
    {
        var typeName = property.Type.FullName;
        
        //List<>
        if (Regex.Match(typeName, @"^System.Collections.Generic.(List|ICollection|IEnumerable)<([<>\w.]+)>$").Success)
        {
            var typeArgument = property.Type.TypeArguments.FirstOrDefault().FullName;

            if (Regex.Match(typeArgument, @"^System.Collections.Generic.(List|ICollection|IEnumerable)<([<>\w.]+)>$").Success)
            {
                typeArgument = typeArgument.Replace("System.Collections.Generic.List<", "").Replace(">", "");
                return GetType(typeArgument) + "[][]";
            }
            else
            {
                return GetType(typeArgument) + "[]";
            }
        }
        //IFormFile
        else if (Regex.Match(typeName, @"^Microsoft.AspNetCore.Http.IFormFile$").Success)
        {
            return "File";
        }
        else if (property.Type.IsGeneric)
        {
            var typeArgument = property.Type.TypeArguments.FirstOrDefault().FullName;
            return property.Type.Namespace + "." + property.Type.Name;
        }

        return GetType(typeName);
    }

    string GetType(string typeName) {
        //String
        if (Regex.Match(typeName, @"^System.String$").Success)
        {
            return "string";
        }
        //DateTime
        else if (Regex.Match(typeName, @"^System.DateTime$").Success)
        {
            return "Date";
        }
        //Boolean
        else if (Regex.Match(typeName, @"^System.Boolean\??$").Success)
        {
            return "boolean";
        }
        //Int32
        else if (Regex.Match(typeName, @"^System.Int(32|64)(\?)?$").Success)
        {
            return "number";
        }
        //Double
        else if (Regex.Match(typeName, @"^System.(Double|Decimal|Single)(\?)?$").Success)
        {
            return "number";
        }
        //Object
        else if (Regex.Match(typeName, @"^System.Object$").Success)
        {
            return "Object";
        }
        else
        {
            return typeName;
        }
    }

    string NameMap(Property property)
    {
        var name = property.name;

        if (property.Type.IsNullable)
        {
            return name + "?";
        }
        else
        {
            return name;
        }
    }
}$Classes(Things.Api.*Models.*)[export namespace $Namespace {
    export class $Name$IsGeneric[$TypeArguments] $BaseClass[extends $Name ]{$Properties[
        $NameMap: $TypeMap;]
    }
}
]$Enums(Things.Api.*Models.*)[export namespace $Namespace {
    export enum $Name {$Values[
        $name = $Value,]
    }
}]$Classes(AmazonProductAdvertising.Api.Model.*)[export namespace $Namespace {
    export class $Name$IsGeneric[$TypeArguments] $BaseClass[extends $Name ]{$Properties[
        $NameMap: $TypeMap;]
    }
}
]$Enums(AmazonProductAdvertising.Api.Model.*)[export namespace $Namespace {
    export enum $Name {$Values[
        $name = $Value,]
    }
}]