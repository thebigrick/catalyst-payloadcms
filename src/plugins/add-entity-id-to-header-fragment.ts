import { DocumentNode, SelectionNode, SelectionSetNode } from '@0no-co/graphql.web';
import { HeaderFragment } from '@bigcommerce/catalyst-core/components/header/fragment';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { Kind } from 'graphql/language';

const addEntityIdToHeaderFragment = valuePlugin<typeof HeaderFragment>({
  name: 'add-entity-id-to-header-fragment',
  resourceId: '@bigcommerce/catalyst-core/components/header/fragment:HeaderFragment',
  wrap: (fragment: DocumentNode) => {
    const addEntityIdToCategoryTree = (
      selectionSet: SelectionSetNode | undefined,
      inCategoryTree: boolean,
    ) => {
      if (!selectionSet?.selections) return;

      selectionSet.selections.forEach((selection: SelectionNode) => {
        if (
          selection.kind === Kind.FIELD &&
          (selection.name.value === 'categoryTree' ||
            (selection.name.value === 'children' && inCategoryTree))
        ) {
          const hasEntityId = selection.selectionSet?.selections.some(
            (child: SelectionNode) => child.kind === Kind.FIELD && child.name.value === 'entityId',
          );

          if (!hasEntityId && selection.selectionSet) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            (selection.selectionSet.selections as SelectionNode[]).push({
              kind: Kind.FIELD,
              name: { kind: Kind.NAME, value: 'entityId' },
            });
          }

          if (selection.selectionSet) {
            addEntityIdToCategoryTree(selection.selectionSet, true);
          }
        }
      });
    };

    const definitions = fragment.definitions;

    definitions.forEach((definition) => {
      if (definition.kind === Kind.FRAGMENT_DEFINITION) {
        addEntityIdToCategoryTree(definition.selectionSet, false);
      }
    });

    return fragment;
  },
});

export default addEntityIdToHeaderFragment;
