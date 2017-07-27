${
    using Typewriter.Extensions.WebApi;
    using Typewriter.Extensions.Types;
    using System.Text.RegularExpressions;

    string TypeMap(Parameter param)
    {
        var typescriptTypeName = String.Empty;
        var typeName = param.Type.FullName;

        if (param.HasDefaultValue) {
            if (param.DefaultValue == "\"\"") {
                return $" = ''";
            }
            else {
                return $" = {param.DefaultValue}";
            }
        }
        else {
            //List<>
            if (Regex.Match(typeName, @"^System.Collections.Generic.(List|ICollection|IEnumerable)<([\w.]+)>$").Success)
            {
                var typeArgument = param.Type.TypeArguments.FirstOrDefault().FullName;
                typescriptTypeName = GetType(typeArgument) + "[]";
            }
            //IFormFile
            else if (Regex.Match(typeName, @"^Microsoft.AspNetCore.Http.IFormFile$").Success)
            {
                typescriptTypeName = "FileList";
            }

            if (String.IsNullOrEmpty(typescriptTypeName)) {
                typescriptTypeName = GetType(typeName);
            }

            return $": {typescriptTypeName}";
        }
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
        else if (Regex.Match(typeName, @"^System.Boolean$").Success)
        {
            return "boolean";
        }
        //bool
        if (Regex.Match(typeName, @"^bool$").Success)
        {
            return "boolean";
        }
        //int
        if (Regex.Match(typeName, @"^int").Success)
        {
            return "number";
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
        //Int32
        else if (Regex.Match(typeName, @"^dynamic$").Success)
        {
            return "any";
        }
        //object
        else if (Regex.Match(typeName, @"^object$").Success)
        {
            return "Object";
        }
        else
        {
            return typeName;
        }
    }

    string NameMap(Parameter param)
    {
        var name = param.name;

        if (param.Type.IsNullable) {
            return name + "?";
        }
        else {
            return name;
        }
    }

    string ReturnType(Method method) {
        var attribute = method.Attributes.FirstOrDefault(x => x.Name.Equals("ProducesResponseType"));
        if (attribute == null) {
            return "void";
        }
        else {
            string typeName = attribute.Value;
            typeName = typeName.Substring(7, (typeName.Length - 13));

            //List<>
            if (Regex.Match(typeName, @"^System.Collections.Generic.(List|ICollection|IEnumerable)<([\w.]+)>$").Success)
            {
                typeName = typeName.Replace("System.Collections.Generic.List<", "").Replace(">", "");
                return typeName + "[]";
            }
            else
            {
                return GetType(typeName);
            }
        }
        //ProducesResponseType

        //return method.Type.Name == "IActionResult" ? "void" : GetType(method.Type.Name);;
    }

    string ServiceName(Class c) => c.Name.Replace("Controller", "Service");
}$Classes(:BaseController)[
@Injectable()
export class $Name {
    constructor(private http: Http, private httpService: HttpService) { }$Methods[
        /**
        *$DocComment[ $Summary]
        * TODO: Observable<$RequestData>
        */
        public $name($Parameters[$NameMap$TypeMap][, ]):
        Observable<$ReturnType> {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers = this.httpService.addAuthHeaders(headers);

            const request = new Request({
                url: `${this.httpService.apiUrl}/$Url`,
                method: `$HttpMethod`,
                body: $RequestData,
                headers: headers
            });

            return this.http.request(request)
                .map((res) => this.httpService.extractData(res))
                .catch((err) => this.httpService.handleError(err));
        };]
}]