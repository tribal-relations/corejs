import YAML from 'yaml'


class Printer {
    public getCleanYaml(value: any, emptyValue: string = '', colon: string = ':'): string {
        let techTreeAsString = YAML.stringify(value, { indent: 24 })

        techTreeAsString = techTreeAsString.replaceAll(': {}', emptyValue)
        techTreeAsString = techTreeAsString.replaceAll(':', colon)

        return techTreeAsString
    }
}

export default Printer
