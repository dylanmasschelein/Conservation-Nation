import iucnCategories from "../../helperFunctions";
import "./SpecificArea.scss";

export default function SpecificArea({ area }) {
  console.log(iucnCategories, "this is the function");
  return (
    <div className='area'>
      <h1 className='area__name'>{area.name}</h1>
      <span className='area__info'>Country: {area.countries[0].name}</span>
      <span className='area__info'>Total Area: {area.reported_area}</span>
      {area.marine && <span className='area__info'>Protected marine area</span>}
      {area.marine && (
        <span className='area__info'>
          Total marine area: {area.reported_marine_area}
        </span>
      )}
      <span className='area__info'>
        Category: {iucnCategories(area.iucn_category.name)}
      </span>
      <span className='area__info'>Jurisdiction: {area.designation.name}</span>
      <span className='area__info'>
        Management Authority: {area.management_authority.name}
      </span>
      <span className='area__info'>
        Governance: {area.governance.governance_type}
      </span>
    </div>
  );
}
