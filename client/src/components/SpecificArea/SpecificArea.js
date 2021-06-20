import iucnCategories from "../../helperFunctions";
import "./SpecificArea.scss";

export default function SpecificArea({ area }) {
  return (
    <div className='area'>
      <h1 className='area__name'>{area.name}</h1>
      <span className='area__info'>
        <strong>Country:</strong> {area.countries[0].name}
      </span>
      <span className='area__info'>
        <strong>Total Area:</strong> {area.reported_area}km<sup>2</sup>
      </span>
      {area.marine && (
        <span className='area__info'>
          <strong>Total marine area:</strong> {area.reported_marine_area}km
          <sup>2</sup>
        </span>
      )}
      <span className='area__info'>
        <strong>Category:</strong> {iucnCategories(area.iucn_category.name)}
      </span>
      <span className='area__info'>
        <strong>Jurisdiction:</strong> {area.designation.name}
      </span>
      <span className='area__info'>
        <strong>Management Authority:</strong> {area.management_authority.name}
      </span>
      <span className='area__info'>
        <strong>Governance:</strong> {area.governance.governance_type}
      </span>
    </div>
  );
}
